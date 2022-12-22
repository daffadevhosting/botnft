import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import styles from "../styles/Home.module.scss";

export default function LoadingSection() {
  return <div className={styles.loading}><Spinner animation="grow" variant="primary" /></div>;
}
