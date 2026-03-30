import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import ItemRenderer from '../../components/responses/ItemRenderer';

type NormalizedItemType =
  | 'SectionHeader'
  | 'Criterion'
  | 'TextField'
  | 'TextArea'
  | 'Dropdown'
  | 'MultipleChoice'
  | 'Scale'
  | 'Checkbox'
  | 'UploadFile'
  | 'Unknown';

const normalizeItemType = (item: any): NormalizedItemType => {
  const rawType = String(item?.question_type || item?.item_type || item?.type || '')
    .replace(/[_\s-]+/g, '')
    .toLowerCase();

  if (rawType === 'sectionheader') return 'SectionHeader';
  if (rawType === 'criterion' || rawType === 'scoredquestion') return 'Criterion';
  if (rawType === 'textfield') return 'TextField';
  if (rawType === 'textarea') return 'TextArea';
  if (rawType === 'dropdown') return 'Dropdown';
  if (rawType.includes('multiplechoice')) return 'MultipleChoice';
  if (rawType === 'scale') return 'Scale';
  if (rawType === 'checkbox') return 'Checkbox';
  if (rawType === 'uploadfile' || rawType === 'file') return 'UploadFile';
  return 'Unknown';
};

const parseAlternatives = (item: any): string[] => {
  const raw = item?.alternatives ?? item?.options ?? item?.choices;
  if (Array.isArray(raw)) return raw.map((c) => String(c).trim()).filter(Boolean);
  if (typeof raw === 'string') {
    return raw.split(/\r?\n|\||,|;/).map((c) => c.trim()).filter(Boolean);
  }
  return [];
};

const TeammateReview = () => {
  const location = useLocation();

  const { data: assignmentResponse, sendRequest: fetchAssignment, isLoading: assignmentLoading } = useAPI();
  const { data: itemsResponse, sendRequest: fetchItems, isLoading: itemsLoading } = useAPI();
  const { data: submitResponse, error: submitError, sendRequest: submitReview } = useAPI();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const assignmentId = Number(query.get('assignment_id'));
  const questionnaireId = Number(query.get('questionnaire_id'));
  const mapId = Number(query.get('map_id')); // 🔥 IMPORTANT FIX

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});
  const [booleanSelections, setBooleanSelections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (assignmentId) {
      fetchAssignment({ url: `/assignments/${assignmentId}`, method: 'GET' });
    }
  }, [assignmentId]);

  useEffect(() => {
    if (questionnaireId) {
      fetchItems({ url: `/questionnaires/${questionnaireId}/items`, method: 'GET' });
    }
  }, [questionnaireId]);

  const items = itemsResponse?.data || [];
  const isLoading = assignmentLoading || itemsLoading;

  const handleSubmit = () => {
    if (!mapId) {
      alert("Missing map_id in URL. Cannot submit.");
      return;
    }

    const payload = {
      map_id: mapId, // 🔥 THIS FIXES YOUR ERROR
      questionnaire_id: questionnaireId,
      assignment_id: assignmentId,
      answers,
      comments,
      multiSelections,
      booleanSelections,
    };

    console.log("SUBMIT PAYLOAD:", payload);

    submitReview({
      url: "/responses",
      method: "POST",
      data: payload,
    });
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '1.5rem' }}>
      <h4>Review Questionnaire</h4>

      {isLoading && <Spinner />}

      {items.length > 0 && (
        <Form>
          {items.map((item: any, idx: number) => {
            const itemId = String(item.id ?? idx);
            const itemType = normalizeItemType(item);
            const options = parseAlternatives(item);

            return (
              <div key={itemId}>
                <p>{idx + 1}. {item.txt}</p>

                <ItemRenderer
                  itemType={itemType}
                  itemId={itemId}
                  item={item}
                  value={answers[itemId] ?? ''}
                  comment={comments[itemId] ?? ''}
                  options={options}
                  multiValue={multiSelections[itemId] ?? []}
                  booleanValue={booleanSelections[itemId] ?? false}
                  onValueChange={(v) => setAnswers(p => ({ ...p, [itemId]: v }))}
                  onCommentChange={(v) => setComments(p => ({ ...p, [itemId]: v }))}
                  onMultiValueChange={(v) => setMultiSelections(p => ({ ...p, [itemId]: v }))}
                  onBooleanChange={(v) => setBooleanSelections(p => ({ ...p, [itemId]: v }))}
                />
              </div>
            );
          })}

          <Button type="button" onClick={handleSubmit}>
            Submit Review
          </Button>

          {submitResponse && <Alert variant="success">Submitted successfully!</Alert>}
          {submitError && <Alert variant="danger">{submitError}</Alert>}
        </Form>
      )}
    </div>
  );
};

export default TeammateReview;