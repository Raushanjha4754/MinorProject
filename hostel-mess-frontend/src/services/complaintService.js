// src/services/complaintService.js
const mockComplaints = [
    {
      id: 1,
      studentId: "stu123",
      title: "Broken Window",
      category: "Hostel",
      description: "Window in room 203 won't close properly",
      status: "Pending",
      date: "2023-11-05T10:30:00Z"
    },
    {
      id: 2,
      studentId: "stu123",
      title: "Mess Food Quality",
      category: "Mess",
      description: "Food was cold during dinner time",
      status: "Resolved",
      date: "2023-11-03T18:45:00Z"
    }
  ];
  
  export default {
    submitComplaint: async (data) => {
      const newComplaint = { ...data, id: Date.now() };
      mockComplaints.push(newComplaint);
      return newComplaint;
    },
    getStudentComplaints: async (studentId) => {
      return mockComplaints.filter(c => c.studentId === studentId);
    }
  };