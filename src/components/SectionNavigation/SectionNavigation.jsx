import React, { Fragment } from "react";
import "./SectionNavigation.scss";
import { ReactComponent as ArrowRightIcon } from "../../assets/img/arrow-right.svg";

export const SectionNavigation = ({ sections }) => {
  return (
    <div className="section-navigation">
      {sections
        ? sections.map((item, index) => {
            if (index === sections.length - 1) {
              return <span key={`${item.name} + ${index}`}>{item.name}</span>;
            } else {
              return (
                <Fragment key={`${item.name} + ${index}`}>
                  <a href={item.link}>{item.name}</a>
                  <ArrowRightIcon />
                </Fragment>
              );
            }
          })
        : ""}
    </div>
  );
};
