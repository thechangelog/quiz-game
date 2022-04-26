import { useMemo } from 'react';
import { useQuestion } from '../hooks/game';
import { Round as RoundType } from '../types';
import { Category } from './Category';
import { Question } from './Question';
import classes from './Round.module.css';

export interface BaseRoundProps {
  round: RoundType;
}

export function RegularRound({ round }: BaseRoundProps) {
  const { selectQuestion, toggleAnswer, currentQuestion, showAnswer, closeQuestion } = useQuestion();
  const question = useMemo(() => currentQuestion?.question, [currentQuestion]);
  const category = useMemo(() => currentQuestion?.category, [currentQuestion]);
  const { categories } = round;
  return (
    <div key="grid" className={`${classes.root} ${categories.length === 4 ? classes.fourColumns : ''}`}>
      {categories.map((category) => (
        <Category category={category} key={category.name} onClick={(question) => selectQuestion(question, category)} />
      ))}

      {question && category ? (
        <Question
          question={question}
          category={category}
          showAnswer={showAnswer}
          onClick={() => {
            closeQuestion();
          }}
          onShowAnswer={() => {
            toggleAnswer();
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export function FinalRound({ round }: BaseRoundProps) {
  const { selectQuestion, toggleAnswer, currentQuestion: current, showAnswer, closeQuestion } = useQuestion();
  const [
    {
      questions: [question],
    },
  ] = round.categories;
  const [category] = round.categories;
  const currentQuestion = current?.question;
  const currentCategory = current?.category;
  return (
    <div className={classes.final}>
      {currentQuestion && currentCategory ? (
        <Question
          final
          question={currentQuestion}
          category={currentCategory}
          showAnswer={showAnswer}
          onClick={() => {
            closeQuestion();
          }}
          onShowAnswer={() => {
            toggleAnswer();
          }}
        />
      ) : (
        <div
          className={classes.category}
          onClick={() => {
            selectQuestion(question, category);
            // set current question
          }}
        >
          Final round category: {category.name}
        </div>
      )}
    </div>
  );
}

export interface RoundProps extends BaseRoundProps {
  final?: boolean;
}

export const Round = ({ final, ...props }: RoundProps) =>
  final ? <FinalRound {...props} /> : <RegularRound {...props} />;
