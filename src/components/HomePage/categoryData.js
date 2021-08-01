import c0 from '../../styles/HomePage/images/category/c0.jpg';
import c1 from '../../styles/HomePage/images/category/c1.jpg';
import c2 from '../../styles/HomePage/images/category/c2.jpg';
import c3 from '../../styles/HomePage/images/category/c3.jpg';
import c4 from '../../styles/HomePage/images/category/c4.jpg';
import c5 from '../../styles/HomePage/images/category/c5.jpg';
import c6 from '../../styles/HomePage/images/category/c6.jpg';
import c7 from '../../styles/HomePage/images/category/c7.jpg';
import c8 from '../../styles/HomePage/images/category/c8.jpg';
import c9 from '../../styles/HomePage/images/category/c9.jpg';
import c10 from '../../styles/HomePage/images/category/c10.jpg';
import c11 from '../../styles/HomePage/images/category/c11.jpg';
import c12 from '../../styles/HomePage/images/category/c12.jpg';
import c13 from '../../styles/HomePage/images/category/c13.jpg';
import c14 from '../../styles/HomePage/images/category/c14.jpg';
import c15 from '../../styles/HomePage/images/category/c15.jpg';
import c16 from '../../styles/HomePage/images/category/c16.jpg';
import c17 from '../../styles/HomePage/images/category/c17.jpg';
import c18 from '../../styles/HomePage/images/category/c18.jpg';
import c19 from '../../styles/HomePage/images/category/c19.jpg';
import c20 from '../../styles/HomePage/images/category/c20.jpg';
import c21 from '../../styles/HomePage/images/category/c21.jpg';
import c22 from '../../styles/HomePage/images/category/c22.jpg';
import c23 from '../../styles/HomePage/images/category/c23.jpg';

const imgCategory = [
  c0,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
  c15,
  c16,
  c17,
  c18,
  c19,
  c20,
  c21,
  c22,
  c23,
];

const textCategory = [
  '女生衣著',
  '男生衣著',
  '運動、健身',
  '男女鞋',
  '女生配件',
  '美妝保健',
  '嬰幼童與母親',
  '女生包包、精品',
  '男生包包、配件',
  '戶外旅行',
  '文創商品',
  '書籍、雜誌',
  '居家生活',
  '美食、伴手禮',
  '汽機車零件百貨',
  '遊戲',
  '娛樂、收藏',
  '寵物',
  '手機平板、周邊',
  '3C',
  '家電影音',
  '服務、票券',
  '其他類別',
];

const categoryData = textCategory.map((name, index) => {
  return {
    name,
    image: imgCategory[index],
  };
});

export default categoryData;
