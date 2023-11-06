export interface OnboardingData {
    id: number;
    title: string;
    description: string;
    image_uri: number;
}

const onboardingData: OnboardingData[] = [
    {
        id: 1,
        title: 'First Item',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
        image_uri: require('../assets/images/onboard1.png'),
    },
    {
        id: 2,
        title: 'Second Item',
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        image_uri: require('../assets/images/onboard2.png'),
    },
    {
        id: 3,
        title: 'Third Item',
        description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.',
        image_uri: require('../assets/images/onboard3.png'),
    },
];
export default onboardingData;