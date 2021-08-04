import { React } from 'react';
import ModalMessage from '../app/ModalMessage';
import LoaderDot from './LoaderDot';

const LoaderDotModal = ({ LoaderDotModalRef }) => {
  return <ModalMessage ModolMessageRef={LoaderDotModalRef} message={<LoaderDot />} IconInfo={0} />;
};

export default LoaderDotModal;
