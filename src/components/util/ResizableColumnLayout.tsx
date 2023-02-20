import * as React from "react";

type ResizableColumnLayoutProps = {
  children?: React.ReactNode;
};

const ResizableColumnLayout: React.FC<ResizableColumnLayoutProps> = (props) => {
  const [sizes, setSizes] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    if (props.children) {
      if (Array.isArray(props.children)) {
        // Num children
        const NUM_CHILDREN = props.children.length;
        const START_SIZE = 100.0 / NUM_CHILDREN;
        let newSizes = [];
        // Many Elements
        for (let childElement of props.children) {
          newSizes.push(START_SIZE);
        }

        // Set our state to be the newly computed sizes
        setSizes(newSizes);
      } else {
        // One Element
        setSizes([100]);
      }
    }
  }, [props.children]);

  const renderItemOrItems = (children: React.ReactNode) => {
    if (Array.isArray(children)) {
      // Map all given children, calculate their sizes
      return (
        <>
          {/* Render the Content */}
          {children.map((item, index: number) => (
            <div
              key={index}
              style={{
                width: `${sizes[index]}vw`,
                height: "100vh",
                display: "inline-block",
                overflow: "auto",
              }}
            >
              {item}
            </div>
          ))}
          {/* Render the Sliders betweent the Content */}
          {children.map((item, index: number) =>
            index >= 0 ? (
              <div
                key={`slider_${index}`}
                style={{
                  width: "8px",
                  height: "100vh",
                  transform: "translate(-50%, 0)",
                  background: "#FFFFFF66",
                  left: `${sizes[index]}vw`,
                  top: "0px",
                  position: "absolute",
                }}
              ></div>
            ) : (
              <></>
            )
          )}
        </>
      );
    } else {
      return children;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {props.children ? (
        renderItemOrItems(props.children)
      ) : (
        <>No items passed</>
      )}
    </div>
  );
};

export default ResizableColumnLayout;
