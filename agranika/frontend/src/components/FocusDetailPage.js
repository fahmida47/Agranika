import React from "react";
import "./Focus.css";
import { focusContent } from "./FocusContent";

const FocusDetailPage = ({ pageKey, goBack }) => {
  const data = focusContent[pageKey];

  if (!data) return <div>Content Not Found</div>;

  return (
    <div className="focus-detail-page fade-in">
      <button className="back-to-focus-btn" onClick={goBack}>← Back to Focus Areas</button>
      
      <div className="subpage-content">
        <div className="detail-image-box">
          <img src={data.img} alt={data.title} className="subpage-img" />
        </div>
        
        <div className="detail-text-box">
          <h2>{data.title}</h2>
          <p className="subpage-subtitle">{data.subTitle}</p>
          <p className="detail-desc">{data.desc}</p>

          <div className="detail-points">
            {data.points.map((p) => (
              <div key={p.id} className="detail-point-item">
                <span className="point-number">{p.id}</span>
                <div className="point-text-content">
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusDetailPage;