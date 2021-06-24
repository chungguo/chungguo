import React from 'react';

export default function BlockquoteRender(props) {
  const { node, children, ...other } = props;

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child as React.ReactElement<any>, 
        { 
          className: 'ml-4',
        });
    }
    return child;
  });


  return (
    <blockquote className="border-l-4 border-blue-600 text-gray-400" {...other}>
      {childrenWithProps}
    </blockquote>
  )
}