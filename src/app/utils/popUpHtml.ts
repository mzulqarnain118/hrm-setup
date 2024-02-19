import { toPascalCase } from './toPascalNotation';
import { formatNumberWithCommas } from './formatNumberWithCommas';
import { inject } from '@angular/core';
import { ApiService } from '../_Services/api.service';
import { environment } from '../../environments/environment';



export function renderPopupHtml(
  properties: any,
  currentBoundry: string,
  latlong?: any,
  apiService?: ApiService
): string {
  const outerContainer = `background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);`;
  const containerStyle = `
      padding: 10px 10px 5px 10px;
      max-width: 250px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-height:500px;
      overflow:auto;
      scrollbar-width: thin;
      scrollbar-color: #1BC693 #DDDDDD;
  `;

  const itemStyle = `
      padding: 10px 0px;
      border-bottom:1px solid #DDDDDD;
  `;

  const keyStyle = `
      color: #333;
  `;

  const valueStyle = `
      color: #666;
  `;
  const linkStyle = `
  padding: 10px 10px;
    width: 58%;
  background-color:#1BC693;
    transform: translateX(-50%);
    color: white;
`;
  const center = `padding:10px 58px;
background-color:#1BC693;
border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; 
`;
  let html = `<div style="${outerContainer}"><div style="${containerStyle}">`;

  if (latlong) {
    html += `
            <div style="${itemStyle}">
    <strong style="${keyStyle}">Latitude:</strong>
    <span style="${valueStyle}">${latlong.lat}</span>
</div>
<div style="${itemStyle}">
    <strong style="${keyStyle}">Longitude:</strong>
    <span style="${valueStyle}">${latlong.lng}</span>
</div>
`;
  }

  for (let key in properties) {
    if (key.includes('id') || key.includes('c_id')) continue;

    html += `
          <div style="${itemStyle}">
              <strong style="${keyStyle}">${
      key === 'Boundary Name' ? toPascalCase(currentBoundry) : key
    }:</strong>
              <span style="${valueStyle}">${formatNumberWithCommas(
      properties[key]
    )}</span>
          </div>
      `;
  }

  html += '</div>';
  
  if (properties['Field ID']) {
  const href = environment.AuthServiceURL + `/agri/fieldRedirection?path=all-surveys/bounderies/field&id=${properties['Field ID']}`;
  html += `
    <div style="${center}"> <a href= ${href} style="${linkStyle}">View eSurvey Detail</a></div>
    `;
  html += '</div>';

  }

  return html;
}

export function markerPopupHtml(properties: any): string {
  let popupContent =
    '<div style="background: #fff; border-radius: 5px; border: 1px solid #ccc; padding: 10px; font-size: 12px; color: #333;">'; // Inline styles added here
  for (const key in properties) {
    popupContent += `<strong>${key}:</strong> ${properties[key]}<br>`;
  }

  popupContent += '</div>';
  return popupContent;
}
