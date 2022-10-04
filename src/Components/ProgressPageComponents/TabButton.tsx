import React from 'react'

type TabButtonProps = {
  label: string;
  selected: boolean;
  handleCLick: (l: string) => void;
}

const TabButton = ({ label, selected, handleCLick }: TabButtonProps) => {
  return (
    <div
      className="border-b-2 hover:border-blue-500 hover:cursor-pointer"
      onClick={() => handleCLick(label)}
      style={{ borderBottomColor: selected ? '#60a5fa' : '' }}>
      <span>{label}</span>
    </div>
  )
}

export default TabButton