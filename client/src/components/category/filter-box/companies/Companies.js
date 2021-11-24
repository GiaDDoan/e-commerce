import React, { useState } from "react";
import styled from "styled-components";
import "./Companies.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Companies({ filter, setFilter, companies }) {
  const { action, categoryName, page } = useParams();
  const items = useSelector((state) => state.items);

  if (companies) {
    return (
      <Wrapper className="companies-wrapper">
        <div className="filter-header">Companies</div>
        <ul className="price-wrapper">
          {companies.map((company, i) => {
            return (
              <li>
                <input
                  type="checkbox"
                  id={company.companyId}
                  onChange={(e) => {
                    //////If checkbox is checked, check if the companyId already exist or not before sending it to the filter state
                    if (
                      e.target.checked &&
                      !filter.companyIds.includes(company.companyId)
                    ) {
                      console.log("checked");
                      setFilter({
                        ...filter,
                        companyIds: [...filter.companyIds, company.companyId],
                      });
                    } else {
                      ////If we uncheck, we remove the companyId from the filter
                      console.log("unchecked");
                      const index = filter.companyIds.indexOf(
                        company.companyId
                      );
                      const copiedCompanyIds = [...filter.companyIds];
                      copiedCompanyIds.splice(index, 1);
                      setFilter({
                        ...filter,
                        companyIds: copiedCompanyIds,
                      });
                    }
                  }}
                />
                <label for={company.companyId} key={`${company.name}`}>
                  {company.name}
                </label>
              </li>

              // <Company key={company._id}>
              //   <label>
              //     <input
              //       type="checkbox"
              //       onChange={(e) => {
              //         //////If checkbox is checked, check if the companyId already exist or not before sending it to the filter state
              //         if (
              //           e.target.checked &&
              //           !filter.companyIds.includes(company.companyId)
              //         ) {
              //           console.log('checked');
              //           setFilter({
              //             ...filter,
              //             companyIds: [...filter.companyIds, company.companyId],
              //           });
              //         } else {
              //           ////If we uncheck, we remove the companyId from the filter
              //           console.log('unchecked');
              //           const index = filter.companyIds.indexOf(
              //             company.companyId
              //           );
              //           const copiedCompanyIds = [...filter.companyIds];
              //           copiedCompanyIds.splice(index, 1);
              //           setFilter({
              //             ...filter,
              //             companyIds: copiedCompanyIds,
              //           });
              //         }
              //       }}
              //     />
              //     {company.name}
              //   </label>
              // </Company>
            );
          })}
        </ul>
      </Wrapper>
    );
  } else {
    return null;
  }
}

const Wrapper = styled.div``;
const Company = styled.div``;

export default Companies;
