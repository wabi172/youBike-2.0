'use client'
import Accordion from 'react-bootstrap/Accordion'
import './accordion.scss'

export default function AccordionList({ data }) {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="container " id="1">
            <div className="row accd-row">
              <div className="accd">{data.sarea}</div>
              <div className="accd">{data.sna}</div>
              <div className="accd">{data.available_rent_bikes}</div>
              <div className="accd">{data.available_return_bikes}</div>
              <div className="accd accd-map">
                <a href={`https://www.google.com/maps/place/${data.latitude},${data.longitude}`}>地圖</a>
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="row" id="1">
            <div className="accd">{data.ar}</div>
            <div className="accd">
              更新時間:<br></br>
              {data.updateTime}
            </div>
            <div className="accd">
              站點編號:<br></br>
              {data.sno}
            </div>
            <div className="accd">{data.available_return_bikes}</div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
