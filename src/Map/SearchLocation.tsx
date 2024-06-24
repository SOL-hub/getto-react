import styled from "@emotion/styled";
import { FormEvent, useEffect, useRef, useState } from "react";
const SearchLocation = () => {
  const [keyword, setKeyword] = useState("");
  const placeService = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (placeService.current) {
      return;
    }

    placeService.current = new kakao.maps.services.Places();
  }, []);

  const searchPlaces = (keyword: string) => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    if (!placeService.current) {
      alert("에러");
      return;
    }

    placeService.current?.keywordSearch(keyword, (data, status) => {
      // test
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
      // test
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </Form>
      <List>
        {Array.from({ length: 8 }).map((item, index) => {
          return (
            <Item key={index}>
              <label>지역</label>
              <span>서울시 동작구</span>
            </Item>
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  background-color: white;
  opacity: 0.8;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  position: sticky;
  top: 0;
`;

const Input = styled.input`
  width: 100%;
  min-width: 200px;
  padding: 8px;
  border: 1px solid #c0c0c0;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px dashed #d2d2d2;
  cursor: pointer;

  &:hover {
    background-color: #d2d2d2;
    opacity: 1;
    transition: background-color 0s;
  }
`;

export default SearchLocation;
