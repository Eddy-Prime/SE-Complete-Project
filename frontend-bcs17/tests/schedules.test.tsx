import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
// needed for toBeInTheDocument function
import '@testing-library/jest-dom'
import ScheduleOverview from '../components/schedule/ScheduleOverview'
import ScheduleService from '../services/ScheduleService'

window.React = React

//given
const schedules = [ 
    {id: 0, 
    start: new Date, 
    end: new Date, 
    course: {id: 0, name: "Full-Stack", description: "Web development", phase: 2, credits: 6},
    lecturer: {id: 1,
                user: {id: 4, username: "elste", password: "elste123", firstName: "Elke",  lastName: "Steegmans", email: "elke.steegmans@ucll.be"}, 
                expertise: "web development",
                courses: [{id: 0, name: "Full-Stack", description: "Web development", phase: 2, credits: 6}]},
                students: [{id: 9,
                            user: {id: 9, username: "an", password: "an123", firstName: "An", lastName: "Janssens", email: "an.janssens@student.ucll.be"},
                            studentnumber: "r999"}]
    },
    {id: 2, 
    start: new Date, 
    end: new Date, 
    course: {id: 1, name: "Software Engineering", description: "Engineering", phase: 2, credits: 6},
    lecturer: {id: 1,
                user: {id: 5, username: "johan", password: "johan123", firstName: "Johan",  lastName: "Pieck", email: "johan.pieck@ucll.be"},
                expertise: "web development",
                courses: [{id: 0, name: "Software Engineering", description: "Engineering", phase: 2, credits: 6}]},
                students: [{id: 9,
                            user: {id: 9, username: "an", password: "an123", firstName: "An", lastName: "Janssens", email: "an.janssens@student.ucll.be"},
                            studentnumber: "r999"},
                            {id: 7,
                            user: {id: 7, username: "jan", password: "jan123", firstName: "Jan", lastName: "Janssens", email: "jan.janssens@student.ucll.be"},
                            studentnumber: "r777"}]
    }
]

const students = [  
    {id: 9,
    user: {id: 9, username: "an", password: "an123", firstName: "An", lastName: "Janssens", email: "an.janssens@student.ucll.be"},
    studentnumber: "r999"},
    {id: 7,
    user: {id: 7, username: "jan", password: "jan123", firstName: "Jan", lastName: "Janssens", email: "jan.janssens@student.ucll.be"},
    studentnumber: "r777"}
]

const schedulesWithExtraStudentEnrolled = [ 
    {id: 0, 
    start: new Date, 
    end: new Date, 
    course: {id: 0, name: "Full-Stack", description: "Web development", phase: 2, credits: 6},
    lecturer: {id: 1,
                user: {id: 4, username: "elste", password: "elste123", firstName: "Elke",  lastName: "Steegmans", email: "elke.steegmans@ucll.be"},
                expertise: "web development",
                courses: [{id: 0, name: "Full-Stack", description: "Web development", phase: 2, credits: 6}]},
                students: [{id: 9,
                            user: {id: 9, username: "an", password: "an123", firstName: "An", lastName: "Janssens", email: "an.janssens@student.ucll.be"},
                            studentnumber: "r999"},
                            {id: 7, 
                            user: {username: "jan", password: "jan123", firstName: "Jan", lastName: "Janssens", email: "jan.janssens@student.ucll.be"},
                            studentnumber: "r777"}
                            ]
    },
    {id: 2, 
        start: new Date, 
        end: new Date, 
        course: {id: 1, name: "Software Engineering", description: "Engineering", phase: 2, credits: 6},
        lecturer: {id: 1,
                    user: {id: 5, username: "johan", password: "johan123", firstName: "Johan",  lastName: "Pieck", email: "johan.pieck@ucll.be"},
                    expertise: "web development",
                    courses: [{id: 0, name: "Software Engineering", description: "Engineering", phase: 2, credits: 6}]},
                    students: [{id: 9,
                                user: {id: 9, username: "an", password: "an123", firstName: "An", lastName: "Janssens", email: "an.janssens@student.ucll.be"},
                                studentnumber: "r999"},
                                {id: 7,
                                user: {id: 7, username: "jan", password: "jan123", firstName: "Jan", lastName: "Janssens", email: "jan.janssens@student.ucll.be"},
                                studentnumber: "r777"}]
    }    
]

let scheduleService: jest.Mock
scheduleService = jest.fn()

test('given schedules - when you want to see the overview of the schedules - then the schedules are rendered', async () => {   
    //when
    render(<ScheduleOverview schedules={schedules} students={students} />)

    //then
    expect(screen.getByText('Elke Steegmans'))
    expect(screen.getByText('Johan Pieck'))
})

test('given schedules - when you click on a schedule - then the students enrolled in this schedule are rendered', async () => {   
    //when
    render(<ScheduleOverview schedules={schedules} students={students} />)
    fireEvent.click(screen.getByTestId('0'))

    //then
    expect(screen.getByText('An'))
    expect(screen.getByText('Jan'))
})

test('given students of a schedule - when you click on a student that has not yet enrolled in this schedule - then the student is enrolled and the enroll button besides this student is not rendered anymore', async () => {
    //given
    ScheduleService.enrollStudent = scheduleService.mockResolvedValue(schedulesWithExtraStudentEnrolled)

    //when
    const {rerender} = render(<ScheduleOverview schedules={schedules} students={students} />)
    fireEvent.click(screen.getByTestId('0'))
    fireEvent.click(screen.getByTestId('r777'))
    rerender(<ScheduleOverview schedules={schedulesWithExtraStudentEnrolled} students={students} />)
    fireEvent.click(screen.getByTestId('0'))

    //then
    expect(screen.getByText('An'))
    expect(screen.getByText('Jan'))
    expect(screen.queryByTestId("r777")).not.toBeInTheDocument()
})