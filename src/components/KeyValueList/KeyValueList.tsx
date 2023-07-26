import { FC } from 'react';

import styles from './KeyValueList.module.scss';

interface KeyValueListProps {
  keyValuePairs: Record<string, string | number>;
}

const KeyValueList: FC<KeyValueListProps> = (props) => {
  const { keyValuePairs } = props;

  const { keys, values } = Object.entries(keyValuePairs).reduce(
    ({ keys, values }, [key, value]) => ({
      keys: [...keys, key],
      values: [...values, value],
    }),
    {
      keys: [] as string[],
      values: [] as (string | number)[],
    },
  );

  return (
    <div className={styles['key-value-list']}>
      <div>
        {keys.map((key) => (
          <div key={key}>{key}:</div>
        ))}
      </div>
      <div>
        {values.map((value) => (
          <div key={value}>{value}</div>
        ))}
      </div>
    </div>
  );
};

export default KeyValueList;
