import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';

import avatar from '../assets/imgs/avatar-minion.jpg';

const ImageEditor = () => (
  <div>
    <Header
      title="Brightness & Contrast Developer Test"
      subtitle="01 Jun, 2019 - 31 Dec, 2020"
      avatar={avatar}
    />
    <Main />
  </div>
);

export default ImageEditor;
