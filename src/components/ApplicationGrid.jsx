import React from 'react'

export default function ApplicationGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
      <BoxWrapper>HELLO</BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="flex flex-col items-start px-3 py-4 bg-white  h-60 p-[0.75rem 1rem]">
      <div></div>
      <div></div>
    </div>
  )
}