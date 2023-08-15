import React, { FC, useEffect, useState } from 'react';
// Component
import { Avatar, CircularProgress, Typography, Theme, useTheme } from '@material-ui/core';
import { FormInput } from '../../components/Form'
import { FaBookmark } from 'react-icons/fa'
import { SiNba } from 'react-icons/si'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { StyleProps, colors } from '../../styles';
// Utils
import cx from 'classnames'
import { Player } from '../../core/types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'

type Props = StyleProps;

const Home: FC<Props> = ({ style }) => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState<boolean>(true)

  const allPlayers = useSelector((state: RootState) => state.playerReducer.allPlayers) || []
  const savedPlayers = useSelector((state: RootState) => state.playerReducer.savedPlayers ) || {}

  const [searchTermAll, setSearchTermAll] = useState<string>('')
  const [searchTermFavorites, setSearchTermFavorites] = useState<string>('')

  console.log('savedPlayers: ', savedPlayers)

  useEffect(() => {
    fetch('https://www.balldontlie.io/api/v1/players')
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'SET_ALL_PLAYERS', data: data?.data })
      setisLoading(false)
    })
    .catch(err => console.log('err: ', err))
  }, [])

  const filteredPlayersAll: Player[] = !searchTermAll ? allPlayers : allPlayers.filter((player: Player) => {
    return (`${player.first_name || ''} ${player.last_name || ''}`.toLowerCase()).includes(searchTermAll.toLowerCase())
  })

  const valuesFromFavorites: Player[] = Object.values(savedPlayers || {})

  const filteredPlayersFavorites: Player[] = !searchTermFavorites ? valuesFromFavorites : valuesFromFavorites.filter((player: Player) => {
    return (`${player.first_name || ''} ${player.last_name || ''}`.toLowerCase()).includes(searchTermFavorites.toLowerCase())
  })

  const theme: Theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.container} style={style}>
      <Typography className={classes.containerHeader}>
        <SiNba/>
        NBA Player Finder
      </Typography>
      <div className={classes.finderWrapper}>
        <div className={cx(classes.finderCard, classes.right)}>
          <div className={classes.playersContainer}>
            <Typography className={classes.containerHeader}>All Players</Typography>
            <div className={classes.searchWrapper}>
              <label className={classes.searchLabel}>Search All Players:</label>
              <FormInput
                type="text"
                value={searchTermAll}
                onChange={(e) => setSearchTermAll(e.target.value)}
              >
              </FormInput>
            </div>
            {filteredPlayersAll?.length ? filteredPlayersAll.map((player: Player) => {
              return (
                <div key={player.id} className={classes.playerCardWrapper}>
                  <FaBookmark
                    color={savedPlayers[player.id] ? '#9AE202' : '#384245'}
                    onClick={() => {
                      const savedPlayersClone: Record<string, Player> = { ...savedPlayers }
                      if (savedPlayersClone[player.id]) {
                        delete savedPlayersClone[player.id]
                      } else {
                        savedPlayersClone[player.id] = player
                      }
                      dispatch({ type: 'SET_FAVORITE', data: savedPlayersClone })
                    }}
                  />
                  <Avatar className={classes.avatar}>{`${player.first_name?.charAt(0) || ''} ${player.last_name?.charAt(0)}`}</Avatar>
                  {player.position ? (
                    <div className={classes.positionTag}>
                      {player.position?.toUpperCase()}
                    </div>
                  ) : null}
                  <div className={classes.playerDetailsWrapper}>
                    <Typography className={classes.playerName}>{`${player.first_name || ''} ${player.last_name}`}</Typography>
                    <Typography className={classes.playerdetails}>{`${player.team.abbreviation || ''}`}</Typography>
                  </div>
                </div>
              )
            }) : isLoading ? <CircularProgress /> : <Typography className={classes.containerHeader}>No Results</Typography>}
          </div>
        </div>
        <div className={cx(classes.finderCard, classes.left)}>
          <div className={classes.favoritesContainer}>
          <Typography className={classes.containerHeader}>Saved Players</Typography>
            <div className={classes.searchWrapper}>
              <label className={classes.searchLabel}>Search Saved Players:</label>
              <FormInput
                type="text"
                value={searchTermFavorites}
                onChange={(e) => setSearchTermFavorites(e.target.value)}
              >
              </FormInput>
            </div>
            {filteredPlayersFavorites?.length ? filteredPlayersFavorites.map((player: Player) => {
              return (
                <div key={player.id} className={classes.playerCardWrapper}>
                  <FaBookmark
                    color={savedPlayers[player.id] ? '#9AE202' : '#384245'}
                    onClick={() => {
                      const savedPlayersClone: Record<string, Player> = { ...savedPlayers }
                      if (savedPlayersClone[player.id]) {
                        delete savedPlayersClone[player.id]
                      }
                      dispatch({ type: 'SET_FAVORITE', data: savedPlayersClone })
                    }}
                  />
                  <Avatar className={classes.avatar}>{`${player.first_name?.charAt(0) || ''} ${player.last_name?.charAt(0)}`}</Avatar>
                  {player.position ? (
                    <div className={classes.positionTag}>
                      {player.position?.toUpperCase()}
                    </div>
                  ) : null}
                  <div className={classes.playerDetailsWrapper}>
                    <Typography className={classes.playerName}>{`${player.first_name || ''} ${player.last_name}`}</Typography>
                    <Typography className={classes.playerdetails}>{`${player.team.abbreviation || ''}`}</Typography>
                  </div>
                </div>
              )
            }) : isLoading ? <CircularProgress /> : <Typography className={classes.containerHeader}>No players saved</Typography>}
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    height: 'fit-content',
    backgroundColor: '#212225',
    color: '#fff',
  },
  containerHeader :{
    fontSize: 18,
    color: '#9AE202',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    margin: '24px auto'
  },
  finderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 72,
    gap: 42,
  },
  finderCard: {
    borderRadius: 12,
    padding: '36px 26px',
    paddingTop: 12,
    width: '50%',
    maxWidth: 500,
    boxShadow: '1px 6px 6px 6px rgba(0, 0, 0, 0.2)'
  },
  left: {
    marginRight: 'auto'
  },
  right: {
    marginLeft: 'auto'
  },
  playersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  favoritesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  playerCardWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: 6,
    paddingLeft: 12,
    borderBottom: '1px solid #F7F7F8',
    backgroundColor: '#212225',
    color: '#fff'
  },
  avatar: {
    marginLeft: 24,
  },
  positionTag: {
    borderRadius: 4,
    backgroundColor: colors.lightGrey,
    color: colors.black,
    padding: '4px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginTop: 4,
    marginBottom: 'auto',
    width: 36,
    height: 22,
  },
  playerDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 8,
  },
  playerName: {
    fontSize: 18,
  },
  playerdetails: {
    fontSize: 12
  },
  searchWrapper: {
    padding: '12px 0px'
  },
  searchLabel: {
    paddingRight: 14
  }
}))

export default Home;