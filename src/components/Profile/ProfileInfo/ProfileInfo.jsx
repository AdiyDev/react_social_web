import React, { useState } from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhotoEmpty from '../../../assets/images/userPhotoEmpty.jpg'
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <ul className={s.profileInfoWrapper}>
      <li className={s.imageBlock}>
        <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="Шапка профиля"></img>
      </li>
      <li className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhotoEmpty} alt="" />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </li>
    </ul>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }

    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}


const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;