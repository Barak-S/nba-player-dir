import React, { FC, useState } from 'react';
// Component
import { CircularProgress, Typography, Theme, useTheme } from '@material-ui/core';
import { FormInput, FormColorPicker } from '../../../components/Form'
import { SiNba } from 'react-icons/si'
import { AiFillCloseCircle } from 'react-icons/ai'
import PlayerCard from '../PlayerCard'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { StyleProps } from '../../../styles';
// Utils
import cx from 'classnames'
import { Player } from '../../../core/types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store'

type Props = StyleProps;

const Players: FC<Props> = ({ style }) => {
  const dispatch = useDispatch()

  const allPlayers = useSelector((state: RootState) => state.playerReducer.allPlayers) || []
  const savedPlayers = useSelector((state: RootState) => state.playerReducer.savedPlayers ) || {}
  const isLoading = useSelector((state: RootState) => state.playerReducer.loading )

  const [searchTermAll, setSearchTermAll] = useState<string>('')
  const [searchTermFavorites, setSearchTermFavorites] = useState<string>('')
  const [colorAll, setColorAll] = useState<string>('')
  const [colorFavorites, setColorFavorites] = useState<string>('')

  const filteredPlayersAll: Player[] = !searchTermAll ? allPlayers : allPlayers.filter((player: Player) => {
    return (`${player.first_name || ''} ${player.last_name || ''}`.toLowerCase()).includes(searchTermAll.toLowerCase())
  })

  const valuesFromFavorites: Player[] = Object.values(savedPlayers || {})

  const filteredPlayersFavorites: Player[] = !searchTermFavorites ? valuesFromFavorites : valuesFromFavorites.filter((player: Player) => {
    return (`${player.first_name || ''} ${player.last_name || ''}`.toLowerCase()).includes(searchTermFavorites.toLowerCase())
  })

  const handleSetFavorite = (player: Player) => {
    const savedPlayersClone: Record<string, Player> = { ...savedPlayers }
    if (savedPlayersClone[player.id]) {
      delete savedPlayersClone[player.id]
    } else {
      savedPlayersClone[player.id] = player
    }
    dispatch({ type: 'SET_FAVORITE', data: savedPlayersClone })
  }

  const theme: Theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.container} style={style}>
      <Typography className={classes.containerHeader}>
        <SiNba/>
        NBA Player Finder
      </Typography>
      <div className={classes.finderWrapper}>
        <div
          className={cx(classes.finderCard, classes.right)}
          style={{ backgroundColor: colorAll ? colorAll : '#212225'}}
        >
          <div className={classes.playersContainer}>
            <Typography className={classes.containerHeader}>All Players</Typography>
            <div className={classes.formWrapper}>
              <div className={classes.formRow}>
                <label className={classes.searchLabel} style={{ paddingRight: 65 }}>Search All Players:</label>
                <FormInput
                  type="text"
                  value={searchTermAll}
                  onChange={(e) => setSearchTermAll(e.target.value)}
                />
              </div>
              <div className={classes.formRow}>
                <label className={classes.searchLabel}>Choose Background Color:</label>
                <FormColorPicker
                  value={colorAll}
                  onChange={(color) => setColorAll(color)}
                />
                {colorAll ? <AiFillCloseCircle onClick={() => setColorAll('')} size={18} className={classes.clearIcon} /> : null}
              </div>
            </div>
            {filteredPlayersAll?.length ? filteredPlayersAll.map((player: Player) => {
              return (
                <PlayerCard
                  player={player}
                  savedPlayers={savedPlayers}
                  onSetFavorite={() => handleSetFavorite(player)}
                />
              )
            }) : isLoading ? <CircularProgress className={classes.spinner}/> : <Typography className={classes.containerHeader}>No Results</Typography>}
          </div>
        </div>
        <div
          className={cx(classes.finderCard, classes.left)}
          style={{ backgroundColor: colorFavorites ? colorFavorites : '#212225'}}
        >
          <div className={classes.favoritesContainer}>
          <Typography className={classes.containerHeader}>Saved Players</Typography>
            <div className={classes.formWrapper}>
              <div className={classes.formRow}>
                <label className={classes.searchLabel} style={{ paddingRight: 40 }}>Search Saved Players:</label>
                <FormInput
                  type="text"
                  value={searchTermFavorites}
                  onChange={(e) => setSearchTermFavorites(e.target.value)}
                />
              </div>
              <div className={classes.formRow}>
                <label className={classes.searchLabel}>Choose Background Color:</label>
                <FormColorPicker
                  value={colorFavorites}
                  onChange={(color) => setColorFavorites(color)}
                />
                {colorFavorites ? <AiFillCloseCircle onClick={() => setColorFavorites('')} size={18} className={classes.clearIcon} /> : null}
              </div>
            </div>
            {filteredPlayersFavorites?.length ? filteredPlayersFavorites.map((player: Player) => {
              return (
                <PlayerCard
                  player={player}
                  savedPlayers={savedPlayers}
                  onSetFavorite={() => handleSetFavorite(player)}
                />
              )
            }) : isLoading ? <CircularProgress className={classes.spinner}/> : <Typography className={classes.containerHeader}>No players saved</Typography>}
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
    [theme.breakpoints.down('sm')]: {
      padding: '0px 12px'
    }
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
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  finderCard: {
    borderRadius: 12,
    padding: '36px 26px',
    paddingTop: 12,
    width: '50%',
    maxWidth: 500,
    boxShadow: '0px 6px 6px 6px rgba(0, 0, 0, 0.2)',[theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '26px 12px',
    }
  },
  left: {
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0
    }
  },
  right: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0
    }
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
  formWrapper: {
    padding: '12px 0px',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '8px'
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative'
  },
  searchLabel: {
    paddingRight: 14,
    whiteSpace: 'nowrap'
  },
  spinner: {
    margin: '0 auto',
    marginTop: 24
  },
  clearIcon: {
    cursor: 'pointer',
    marginLeft: 12,
    '&:hover': {
      opacity: 0.7,
    }
  }
}))

export default Players