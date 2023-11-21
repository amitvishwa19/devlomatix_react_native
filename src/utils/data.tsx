import { DoctorsList } from "../screens";

export const MedicalServicesData = [
    {
        id: '1',
        title: 'Doctors',
        image:require('../assets/images/services/doctors.png'),
        component:DoctorsList
    },
    {
        id: '2',
        title: 'Hospitals',
        image:require('../assets/images/services/hospitals.png'),
        component:DoctorsList
    },
    {
        id: '3',
        title: 'Pharmacy',
        image:require('../assets/images/services/pharmacy.png'),
        component:DoctorsList
    },
    {
        id: '4',
        title: 'Ambulance',
        image:require('../assets/images/services/ambulances.png'),
        component:DoctorsList
    },
    {
        id: '5',
        title: 'Pathalogy',
        image:require('../assets/images/services/pathology.png'),
        component:DoctorsList
    },
    {
        id: '6',
        title: 'Services',
        image:require('../assets/images/services/medical_services.png'),
        component:DoctorsList
    },
   
];

export const NotificationData = [
    {
        id:'1',
        date:'8 Nov 23',
        data:[
            {
                id: '1',
                date:'10 Nov 23',
                userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
                title: 'Appointment is scheduled for tomorrow',
                description:'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
                icon:'calendar-outline',
                type:'appointment',
                seen:false,
                create:'',
                updated:''
            },
            {
                id: '2',
                date:'10 Nov 23',
                userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
                title: 'Appolo hohpital added 20 new beds',
                description:'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
                icon:'information-circle-outline',
                type:'info',
                seen:false
                ,
                create:'',
                updated:''
            },
            {
                id: '3',
                date:'10 Nov 23',
                userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
                title: 'Reschedule your appointment with Dr. Preeti',
                description:'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
                icon:'notifications-outline',
                type:'reminder',
                seen:false
                ,
                create:'',
                updated:''
            },
            {
                id: '2',
                date:'10 Nov 23',
                userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
                title: 'Appolo hohpital added 20 new beds',
                description:'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
                icon:'information-circle-outline',
                type:'info',
                seen:false
                ,
                create:'',
                updated:''
            },
            {
                id: '2',
                date:'10 Nov 23',
                userId: 'DdvSXXUIF5Qut7uJxVd5V61pNQg1',
                title: 'Appolo hohpital added 20 new beds',
                description:'Your serial is successfully added in appointment list,serial id 25,We will notify you before 15 mins',
                icon:'information-circle-outline',
                type:'info',
                seen:false
                ,
                create:'',
                updated:''
            },
        ]
    },

];


