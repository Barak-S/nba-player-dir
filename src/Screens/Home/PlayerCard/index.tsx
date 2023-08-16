import React, { FC, useState, useEffect } from 'react'
// Component
import { Avatar, Typography, Theme, useTheme, CircularProgress, useMediaQuery } from '@material-ui/core'
import { FaBookmark } from 'react-icons/fa'
// Styles
import { makeStyles } from '@material-ui/core/styles'
import { StyleProps, colors } from '../../../styles'
// Utils
import { Player, PlayerStats } from '../../../core/types'

interface Props extends StyleProps {
  player: Player;
  savedPlayers?: Record<string, Player>;
  onSetFavorite: () => void;
}

const PlayerContainer: FC<Props> = ({ player, savedPlayers, onSetFavorite }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [playerDetails, setPlayerDetails] = useState<PlayerStats>()
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isOpen) {
      fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${player.id}`)
      .then(res => res.json())
      .then(data => {
        setPlayerDetails(data?.data?.[0] || {})
        setIsStatsLoading(false)
      })
      .catch(err => console.log('err: ', err))
    }
  },[isOpen])

  const theme: Theme = useTheme()
  const classes = useStyles(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      key={player.id}
      className={classes.playerCardWrapper}
      style={{ height: isOpen ? isMobile ? 124 : 104 : 65 }}
    >
      <FaBookmark
        color={savedPlayers?.[player.id] ? colors.primary : colors.default}
        onClick={() => onSetFavorite()}
        className={classes.bookmark}
      />
      <Avatar className={classes.avatar}>{`${player.first_name?.charAt(0) || ''} ${player.last_name?.charAt(0)}`}</Avatar>
      <div className={classes.detailsWrapper}>
        <div className={classes.playerDetailsWrapper}>
          <div className={classes.detailsHeader}>
            {player.position ? (
              <div className={classes.positionTag}>
                {player.position?.toUpperCase()}
              </div>
            ) : null}
            <Typography className={classes.playerName}>{`${player.first_name || ''} ${player.last_name}`}</Typography>
          </div>
          <Typography className={classes.playerdetails}>{`${(isOpen ? player.team.full_name : player.team.abbreviation) || ''}`}</Typography>
        </div>
        <span
          className={classes.showDetails}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'show less' : 'show more'}
        </span>
        {isOpen ? (
          <div className={classes.playerDetailsWrapperMore}>
            <div className={classes.playerDetailsSection}>
              <Typography className={classes.playerdetails}>Conference: <strong className={classes.primary}>{`${player.team?.conference || ''}`}</strong></Typography>
              <Typography className={classes.playerdetails}>Division: <strong className={classes.primary}>{`${player.team?.division || ''}`}</strong></Typography>
            </div>
            <div className={classes.playerDetailsSectionStats}>
              <PlayerStat label={"PPG"} value={isStatsLoading ? <CircularProgress /> : playerDetails?.pts || 'N/A'} />
              <PlayerStat label={"RPG"} value={isStatsLoading ? <CircularProgress /> : playerDetails?.reb || 'N/A'} />
              <PlayerStat label={"APG"} value={isStatsLoading ? <CircularProgress /> : playerDetails?.ast || 'N/A'} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface PlayerStatProps extends StyleProps {
  label: string;
  value: string | number | JSX.Element;
}

const PlayerStat: FC<PlayerStatProps> = ({ label, value }) => {
  const theme: Theme = useTheme()
  const classes = useStyles(theme)
  return (
    <div className={classes.playerStatContainer}>
      <Typography className={classes.playerStatLabel}>{label}</Typography>
      <Typography className={classes.playerStatValue}>{value}</Typography>
    </div>
  )
}


const useStyles = makeStyles((theme: Theme) => ({
  playerCardWrapper: {
    display: 'flex',
    padding: 6,
    paddingLeft: 12,
    borderBottom: '1px solid #F7F7F8',
    backgroundColor: '#212225',
    color: colors.white,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  avatar: {
    marginLeft: 24,
  },
  bookmark: {
    cursor: 'pointer',
    top: 18,
    position: 'absolute',
    left: 10,
    [theme.breakpoints.down('sm')]: {
      left: 0
    }
  },
  positionTag: {
    borderRadius: 4,
    backgroundColor: colors.lightGrey,
    color: colors.black,
    padding: '4px 5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 'auto',
    width: 36,
    height: 22,
    marginRight: 8
  },
  playerDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
  },
  playerDetailsWrapperMore: {
    display: 'flex',
    paddingLeft: 16,
    justifyContent: 'space-between',
    width: '100%'
  },
  playerDetailsSection: {
    width: '50%'
  },
  playerDetailsSectionStats: {
    width: '50%',
    display: 'flex',
    gap: 8,
    transform: 'translateY(-18px)',
    marginRight: 57,
    [theme.breakpoints.down('sm')]: {
      transform: 'translateY(-16px)',
      marginRight: 12,
    }
  },
  detailsHeader: {
    display: 'flex',
    paddingBottom: 8
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  },
  playerName: {
    fontSize: 18,
  },
  playerdetails: {
    fontSize: 12
  },
  showDetails: {
    color: colors.primary,
    fontSize: 11,
    marginLeft: 'auto',
    marginTop: 'auto',
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    top: 34,
    '&:hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
      top: 2,
    }
  },
  primary: {
    color: colors.primary,
    fontWeight: 500
  },
  playerStatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  playerStatLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 500
  },
  playerStatValue: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 500
  }
}))

export default PlayerContainer;