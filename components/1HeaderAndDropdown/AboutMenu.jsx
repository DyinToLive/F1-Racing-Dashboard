import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const AboutMenu = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="dashed" onClick={showDrawer}>
        About
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>React project by Jameson Watson</p>
        <p>Building this project I aimed to learn good React practices, implentation
            of different components using ant design, and styling components using 
            TailwindCSS.
        </p>
        <p>Implented using Vite for building, and render + Github for hosting.</p>
        <p>The fetches in this project are done using supabase/supabase-js. Connected to
            a supabase Postgres DB that we built for our Node project.
        </p>
      </Drawer>
    </>
  );
};
export default AboutMenu;