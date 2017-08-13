//model for issue,comment and issue logs(for tracking closing and reopening of issues)

export class Comment{
    commentAuthor:String;
    commentContent:String;
    commentCreatedDate:String;
    commentCreatedTime:String;
}

export class Log{
    logStatus:String;
    logCreatedDate:String;
    logCreatedTime:String;
    logAuthor:String;
}

export class Issue{
    id:number;
    title:String;
    author:String;
    createdDate:String;
    createdTime:String;
    status:String;
    comments:Comment[];
    logs:Log[];
    timeline=[];
}