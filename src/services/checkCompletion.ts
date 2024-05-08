import addOneDay from './addOneDay'

export default function checkCompletion(doneAt:Date | undefined, estimateAt: Date) : string {

    if(doneAt){
        return 'concluded'
    }

    const dateWithDayAdded = addOneDay(estimateAt)

    if(dateWithDayAdded < new Date()){
        return 'expired'
    }

    return 'pending'

}