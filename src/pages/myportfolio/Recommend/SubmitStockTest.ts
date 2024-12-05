function submitTest(
  event: React.FormEvent<HTMLFormElement>,
  navigate: (path: string) => void
): void {
  event.preventDefault();
  const form = document.getElementById("StockTestForm") as HTMLFormElement;
  let totalScore = 0;
  let allAnswered = true;

  // 각 질문의 점수를 합산
  for (let i = 1; i <= 2; i++) {
    // 질문 수에 맞게 숫자 조정
    const answer = form["q" + i] as RadioNodeList;
    const selectedOption = Array.from(answer).find(
      (option) => (option as HTMLInputElement).checked
    );

    if (!selectedOption) {
      allAnswered = false;
      break;
    } else {
      totalScore += parseInt((selectedOption as HTMLInputElement).value);
    }
  }

  // 모든 질문에 응답하지 않았으면 alert 표시
  if (!allAnswered) {
    alert("모든 질문에 답변해 주세요.");
  } else {
    // 점수를 저장하고 추천 페이지로 이동
    localStorage.setItem("investmentScore", totalScore.toString());
    console.log("제출 완료");
    navigate("/P_recommend");
  }
}

export default submitTest;
