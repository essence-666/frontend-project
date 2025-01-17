import Link from 'next/link';
import styles from '../styles/profile.module.css';
import Image from 'next/image';
import emailIcon from '../../../public/assets/emailSign.png';
import locationIcon from '../../../public/assets/locationSign.png';
import profilePhoto from '../../../public/assets/person.jpeg';
import romashiPhoto from '../../../public/assets/romashki.png';
import editPhoto from '../../../public/assets/edit.png';
import addPhoto from '../../../public/assets/add.png';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from 'react';
import { error } from 'console';
import Flower from '../models/flower';
import { URL } from '../config';

interface Flower {
  map(
    arg0: (
      flow: {
        _id: string;
        name: string;
        scientificName: string;
        location: string;
        frequencyWatering: number;
        wateringChanges: string;
      },
      index: Key | null | undefined,
    ) => import('react').JSX.Element,
  ): ReactNode;
  _id: string;
  name: string;
  scientificName: string;
  location: string;
  frequencyWatering: number;
  wateringChanges: string;
}

const getProfile = async () => {
  try {
    const res = await fetch(`${URL}/api/profileApi`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to get profile editions');
    }
    return res.json();
  } catch (error) {
    return {};
  }
};

const getFlowers = async (): Promise<Flower[]> => {
  try {
    const res = await fetch(`${URL}/api/flowersApi`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to get flowers');
    }
    const data: { [key: string]: Flower } = await res.json();
    return Object.values(data);
  } catch (error) {
    return [];
  }
};

const profilePage = async () => {
  const { profile } = await getProfile();
  const flowersFirst = await getFlowers();
  const flowers = flowersFirst[0];
  if (!profile) {
    return <p>No profile data available</p>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerInfoCalendar}>
        <div className={styles.infoContainer}>
          <Image
            className={styles.image}
            src={profilePhoto}
            alt={'personInitPage'}
            width={100}
            height={100}
          />
          {profile.map(
            (
              prof: {
                _id: string;
                place: string;
                email: string;
                description: string;
                name: string;
              },
              index: Key | null | undefined,
            ) => (
              <div key={index} className={styles.textContainer}>
                <h1>{prof.name}</h1>
                <div className={styles.location}>
                  <Image
                    className={styles.miniImage}
                    src={locationIcon}
                    alt={'personInitPage'}
                    width={20}
                    height={15}
                  />
                  {prof.place}
                </div>
                <div className={styles.email}>
                  <Image
                    className={styles.miniImage}
                    src={emailIcon}
                    alt={'personInitPage'}
                    width={20}
                    height={15}
                  />
                  {prof.email}
                </div>
                <div className={styles.descriptionText}>{prof.description}</div>
                <Link
                  className={styles.editButton}
                  href={`/editProfile/${prof._id}`}
                >
                  <Image
                    className={styles.editImage}
                    src={editPhoto}
                    alt={'personInitPage'}
                    width={50}
                    height={50}
                  />
                </Link>
              </div>
            ),
          )}
        </div>
        <div className={styles.calendarContainer}>
          <h1 className={styles.calendarHead}>Calendar preview</h1>
          <div className={styles.calendarPreview}>
            <div className={styles.Day}>
              <div className={styles.dayLeftPart}>
                <p className={styles.textDay}>Sat</p>
                <p className={styles.circle}> 20 </p>
              </div>
              <div className={styles.dayRightPart}>
                <div className={styles.plantOne}>
                  <p className={styles.plantName}>Rose</p>
                </div>
                <div className={styles.plantOne}>
                  <p className={styles.plantName}>Lilac</p>
                </div>
                <div className={styles.plantOne}>
                  <p className={styles.plantName}>Lily</p>
                </div>
              </div>
            </div>
            <div className={styles.Day}>
              <div className={styles.dayLeftPart}>
                <p className={styles.textDay}>Sun</p>
                <p className={styles.circle}> 21 </p>
              </div>
              <div className={styles.dayRightPart}>
                <div className={styles.plantOne}>
                  <p className={styles.plantName}>Sunflower</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.toCalendarButtonContainer}>
            <Link href="/calendar" passHref>
              <button className={styles.toCalendarButton}>
                Go to calendar
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.containerCollection}>
        <h1 className={styles.collectionPreview}>
          Plant collection
          <Link className="editButton" href={`/addFlowers/`}>
            <Image
              className={styles.editImage}
              src={addPhoto}
              alt={'personInitPage'}
              width={50}
              height={50}
            />
          </Link>
        </h1>
        <div className={styles.collection}>
          {flowers.map(
            (
              flow: {
                _id: string;
                name: string;
                scientificName: string;
                location: string;
                frequencyWatering: number;
                wateringChanges: string;
              },
              index: Key | null | undefined,
            ) => (
              <Link
                key={index}
                href={{
                  pathname: '/flowerElement',
                  query: {
                    _id: flow._id,
                    name: flow.name,
                    scientificName: flow.scientificName,
                    location: flow.location,
                    frequencyWatering: flow.frequencyWatering,
                    wateringChanges: flow.wateringChanges,
                  },
                }}
                passHref
              >
                <button className={styles.plant}>
                  <div className={styles.plantInfo}>
                    <Image
                      className={styles.plantImage}
                      src={romashiPhoto}
                      alt={'personInitPage'}
                      width={166}
                      height={134}
                    />
                    <p className={styles.plantName}> {flow.name} </p>
                  </div>
                </button>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default profilePage;
