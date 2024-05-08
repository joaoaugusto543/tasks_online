export default function addOneDay(date: Date) : Date{

    const dateCopy = new Date(date.getTime())

    const dateWithDayAdded = dateCopy.setHours(date.getHours() + 24)

    return new Date(dateWithDayAdded)

}