import React, {createContext, useState, ReactNode} from 'react'

interface DataContextProps {
    val: [],
    setVal: Function,
}

export const DataContext = createContext<DataContextProps>({
    val: [],
    setVal: () => null
});

export interface LayoutProps {
    children: ReactNode,
}

export const DataContextProvider = (props: LayoutProps) => {
  let val: any = [];

  const setVal = async (input: string) => {
    val.push(input)
    console.log(val);
  }

  const value: DataContextProps = {
      val,
      setVal,
  };

  return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
