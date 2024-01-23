import React from "react";

const ViewSegments = ({ results, setResults }) => {
  const deleteSegment = (index) => {
    let temp = [...results];
    temp.splice(index, 1);
    setResults(temp);
  };

  const SegmentHeader = () => {
    return (
      <div className="row">
        <div className="col header">
          Segment Name
        </div>
        <div className="col header">
          Schemas
        </div>
        <div className="col header">
          Delete
        </div>
      </div>
    );
  };

  const SegmentData = (results) => {
    if (Object.keys(results).length === 0) {
      return <div style={{ fontSize: "18px", fontWeight: "600" }}>No Segments Data</div>;
    } else {
      const schemasmap = (segdetails) => {
        return (
          segdetails.map((segg, index) => (
            <div key={index}>
              <span className={segg.type + "-dot"}></span> &nbsp;&nbsp;
              {Object.values(segg)[0]}
            </div>
          ))
        );
      };

      return (
        <div>
          {SegmentHeader()}
          {results.map((segdetails, index) => (
            <div className="row" key={index}>
              <div className="col">
                {segdetails.segmentName}
              </div>
              <div className="col">
                {schemasmap(segdetails.selectedOptions)}
              </div>
              <div className="col">
                <i onClick={() => deleteSegment(index)} className="fa fa-trash-o" style={{ fontSize: "24px", cursor: "pointer", color: "red" }}></i>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="container">
      {SegmentData(results)}
    </div>
  );
};

export default ViewSegments;
