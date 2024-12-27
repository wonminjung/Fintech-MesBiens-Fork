export interface BoardInfo {
  bno: number;
  bname: string;
  btitle: string;
  bcont: string;
  bhit: number;
}

export const boardInfo: BoardInfo[] = [
  {
    bno: 1,
    bname: "따발총",
    btitle: "이거 실화임?",
    bcont: "홍혁철은 TB조 바지팀장입니다 실질적 팀장은 민지이다.",
    bhit: 400,
  },
  {
    bno: 2,
    bname: "홍철",
    btitle: "민지는 우리팀 기술이사이다.",
    bcont: "민지는 TB조의 기술이사 이자 실질적인 팀장이죠",
    bhit: 300,
  },
];
