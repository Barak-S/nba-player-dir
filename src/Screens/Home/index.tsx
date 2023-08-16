import React, { FC, useEffect } from 'react';
import PlayersContainer from './PlayersContainer'
// Styles
import { StyleProps } from '../../styles';
// Utils
import { useDispatch } from 'react-redux';

type Props = StyleProps;

const Home: FC<Props> = ({ style }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('https://www.balldontlie.io/api/v1/players')
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'SET_ALL_PLAYERS', data: data?.data })
      dispatch({ type: 'SET_LOADING', data: false })
    })
    .catch(err => console.log('err: ', err))
  }, [])

  return <PlayersContainer />
}

export default Home;