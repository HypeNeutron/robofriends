import React from "react";

function CardList({ name, email, id }) {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img src={`https://robohash.org/${id}test?200x200`} alt="robots" />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default function Card({ robots }) {
  return (
    <>
      {robots.map((user) => {
        const { id, name, email } = user;
        return <CardList key={id} name={name} email={email} id={id} />;
      })}
    </>
  );
}
