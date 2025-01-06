import {
  food,
  entertainment,
  gift,
  income,
  shopping,
  other,
} from "../../../components/categoryicons/CategoryIcons";

const CategoryIconMap: { [key: string]: React.FC } = {
  식사: food,
  문화: entertainment,
  선물: gift,
  급여: income,
  쇼핑: shopping,
  기타: other,
  입금: other,
};

export default CategoryIconMap;
