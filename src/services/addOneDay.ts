export default function addOneDay(dateString: Date) : Date{

    const date = new Date(dateString)

    const dateCopy = new Date(date.getTime())

    const dateWithDayAdded = dateCopy.setHours(date.getHours() + 24)

    return new Date(dateWithDayAdded)


}