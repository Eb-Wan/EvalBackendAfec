const Spinner = ({ className="" }) => {
  return (
    <>
    <div className={"spinner-border " + className} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </>
  )
}

export default Spinner