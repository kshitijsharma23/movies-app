import { FC } from 'react';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import styles from './Ratings.module.scss';

interface RatingsProps {
  ratings: string;
}

const RatingsBar = styled(LinearProgress)(() => ({
  height: 8,
  width: 110,
  borderRadius: 'var(--border-radius-small)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--color-bg-progress)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 'var(--border-radius-small)',
    backgroundColor: 'var(--color-accent-primary)',
  },
}));

const Ratings: FC<RatingsProps> = (props) => {
  const { ratings } = props;
  const ratingsValue = Number(ratings) * 10;

  return (
    <div className={styles['ratings-container']}>
      <RatingsBar
        value={Number.isNaN(ratingsValue) ? 0 : ratingsValue}
        variant="determinate"
      />
      <div className={styles['ratings-value']}>{ratings}</div>
    </div>
  );
};

export default Ratings;
