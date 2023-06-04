import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import styled from "styled-components";

interface IPrice {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

const PriceContainer = styled.ul`
  display: grid;
`;

const PriceOpen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PriceHigh = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceLow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Price({ coinId }: PriceProps) {
  const { data } = useQuery<IPrice[]>("pricekey", () =>
    fetchCoinHistory(coinId)
  );
  return (
    <>
      {data?.map((price) => (
        <PriceContainer key={price.time_open}>
          <PriceOpen>
            <span>오픈{price.open}</span>
          </PriceOpen>
          <PriceHigh>
            <span>하이{price.high}</span>
          </PriceHigh>
          <PriceLow>
            <span>로우{price.low}</span>
          </PriceLow>
          <PriceClose>
            <span>클로즈{price.close}</span>
          </PriceClose>
        </PriceContainer>
      ))}
    </>
  );
}

export default Price;
