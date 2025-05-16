import React, { useEffect, useState } from 'react';

export default function STDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulate fetching student data
    const dummyData = [
      { name: 'Jane Doe', status: 'Wellbeing Concern', mood: 'Anxious' },
      { name: 'John Smith', status: 'Stable', mood: 'Okay' },
    ];
    setStudents(dummyData);
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Senior Tutor Dashboard</h2>
      <p>This view shows an overview of students and supervisor interactions.</p>

      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Student</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Status</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Mood</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{s.name}</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{s.status}</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{s.mood}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
