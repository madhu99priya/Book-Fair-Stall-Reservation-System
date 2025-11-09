import React from 'react';
import classNames from 'classnames';
import './StatusBadge.css';

export default function StatusBadge({ status }) {
  return <span className={classNames('badge', status?.toLowerCase())}>{status}</span>;
}