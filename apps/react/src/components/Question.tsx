import { Category, Question as QuestionData } from '../types';
import classes from './Question.module.css';

export interface QuestionProps {
  question: QuestionData;
  category: Category;
  onClick?: (question?: QuestionData) => void;
  showAnswer?: boolean;
  onShowAnswer?: () => void;
  final?: boolean;
}

export function Question({
  question: { clue, answer, image, value },
  category,
  onClick,
  onShowAnswer,
  showAnswer,
  final,
}: QuestionProps) {
  return (
    <div className={`${classes.root} ${final ? classes.finalQuestion : ''}`} onClick={() => onClick?.()}>
      <div className={classes.questionInfo}>
        <div className={classes.category}>{category.name}</div>
        <div className={classes.value}>{value}</div>
      </div>
      {image && (
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={image} alt={clue} />
        </div>
      )}
      <div className={classes.clue}>{clue}</div>
      {showAnswer ? (
        <div className={classes.answer}>{answer}</div>
      ) : (
        <>
          <div
            className={classes.showAnswer}
            onClick={(event) => {
              event.stopPropagation();
              onShowAnswer?.();
            }}
          >
            Show Answer
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
