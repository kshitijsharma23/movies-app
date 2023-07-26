import { FC } from 'react';

import { useAppSelector } from '@hooks/useAppSelector';

import { selectUserProfile } from '@reducers/profileSlice';

import Loader from '@components/Loader/Loader';

import styles from './UserInfo.module.scss';

const UserInfo: FC = () => {
  const { data, loading } = useAppSelector(selectUserProfile);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const { name, displayPicture } = data;
  const userInitials = name
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <div className={styles['user-info']}>
      <div className={styles['user-avataar-wrapper']}>
        {displayPicture ? (
          <img src={displayPicture} className={styles['user-image']} />
        ) : (
          <div className={styles['user-initials']}>{userInitials}</div>
        )}
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default UserInfo;
