import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import { PublicContainer as Container } from '~/styles/Sidebar';

export default () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get('schools');

      setSchools(response.data.filter(school => school.active));
    };

    fetch();
  }, []);

  return (
    <Container>
      <h1>Active International Offices</h1>
      <div style={{ marginTop: 15, minWidth: '40%' }}>
        {schools.map(
          school =>
            school.showContact && (
              <div
                style={{
                  marginBottom: 20,
                  borderBottom: '1px solid #bbb',
                }}
              >
                <p style={{ marginBottom: 5 }}>
                  <b>{school.name}</b>
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <a href={`mailto:${school.contactEmail}`}>
                      {school.contactEmail}
                    </a>
                  </div>
                </div>

                <p>
                  {school.city}, {school.postalCode},<br /> {school.country}
                </p>
              </div>
            )
        )}
      </div>
    </Container>
  );
};
