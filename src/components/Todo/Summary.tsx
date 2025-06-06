import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { NavState, triggerAtom } from "@utils/atom";
import { getCompletedTodosByDate, navLocalTodos } from "@utils/todoHelpers";
import { getLocalStorage } from "@utils/localStorage";

type OwnProps = { nav: string };
export const Summary: React.FC<OwnProps> = ({ nav }) => {
  const [curNav, setCurNav] = useRecoilState(NavState);
  const getStorageTimer = getLocalStorage("timer");
  const trigger = useRecoilValue(triggerAtom);

  useEffect(() => {
    setCurNav({
      nav: nav,
      pendingCount: navLocalTodos(nav).length,
      completedCount: getCompletedTodosByDate(curNav.nav),
    });
  }, [trigger]);

  return (
    <>
      {nav !== "내일" && (
        <Layout>
          <Info>
            <Title>
              <Main>{curNav.pendingCount}</Main>
            </Title>
            <p>완료할 작업</p>
          </Info>
          <Info>
            <Title>
              <Main>{nav === "오늘" ? getStorageTimer?.today : getStorageTimer?.weekend}</Main>
              <span id="m">분</span>
            </Title>
            <p>완료한 시간</p>
          </Info>
          <Info>
            <Title>
              <Main>{curNav.completedCount}</Main>
            </Title>
            <p>완료한 작업</p>
          </Info>
        </Layout>
      )}
    </>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 0.3rem;
  border-radius: 3px;
  background-color: #eeeeee;
`;
const Info = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  p {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.main_color};
  }
`;
const Title = styled.div`
  #m {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.main_color};
  }
`;
const Main = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme: { darkmode } }) => darkmode.main_color};
`;
