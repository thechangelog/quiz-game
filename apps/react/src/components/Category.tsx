import { Category as CategoryData, Question } from '../types';
import classes from './Category.module.css';

export interface CategoryProps {
  category: CategoryData;
  onClick: (question: Question) => void;
}

export const Category = ({ onClick, category: { name, questions } }: CategoryProps) => {
  return (
    <div className={classes.root}>
      <div className={`${classes.box} ${classes.title}`}>{name}</div>
      {questions.map((question) => (
        <div key={question.answer} className={classes.box} onClick={() => onClick(question)}>
          {!question.used && <div className={classes.value}>{question.value}</div>}
        </div>
      ))}
    </div>
  );
};

export default Category;
