
// Autogenerated from https://app.quicktype.io/

export interface User {
    id?:        number;
    username?:  string;
    name:       string;
    state?:     string;
    avatar_url?: string;
    web_url?:    string;
    founded?:   number;
    members?:   string[];
}

export interface Action {
    id?:             number;
    projectID?:      number;
    actionName?:     string;
    targetID?:       null;
    targetIid?:      null;
    targetType?:     null;
    authorID?:       number;
    targetTitle?:    null;
    createdAt?:      Date;
    author?:         Author;
    pushData?:       PushData;
    authorUsername?: string;
    name?:           string;
    founded?:        number;
    members?:        string[];
}

export interface Author {
    id:        number;
    username:  string;
    name:      string;
    state:     string;
    avatarURL: string;
    webURL:    string;
}

export interface PushData {
    commitCount: number;
    action:      string;
    refType:     string;
    commitFrom:  string;
    commitTo:    string;
    ref:         string;
    commitTitle: string;
    refCount:    null;
}

export interface Commit {
    id:              string;
    short_id:        string;
    created_at:      Date;
    parent_ids:      string[];
    title:           string;
    message:         string;
    author_name:     string;
    author_email:    string;
    authored_date:   Date;
    committer_name:  string;
    committer_email: string;
    committed_date:  Date;
    trailers:       boolean;
    web_url:         string;
}

export interface MergeRequest {
    id:                          number;
    iid:                         number;
    projectID:                   number;
    title:                       string;
    description:                 string;
    state:                       string;
    createdAt:                   Date;
    updatedAt:                   Date;
    mergedBy:                    User;
    mergeUser:                   User;
    mergedAt:                    Date;
    closedBy:                    null;
    closedAt:                    null;
    targetBranch:                string;
    sourceBranch:                string;
    userNotesCount:              number;
    upvotes:                     number;
    downvotes:                   number;
    author:                      User;
    assignees:                   User[];
    assignee:                    User;
    reviewers:                   User[];
    sourceProjectID:             number;
    targetProjectID:             number;
    labels:                      string[];
    draft:                       boolean;
    workInProgress:              boolean;
    milestone:                   null;
    mergeWhenPipelineSucceeds:   boolean;
    mergeStatus:                 string;
    sha:                         string;
    mergeCommitSHA:              string;
    squashCommitSHA:             null;
    discussionLocked:            null;
    shouldRemoveSourceBranch:    boolean;
    forceRemoveSourceBranch:     boolean;
    reference:                   string;
    references:                  References;
    webURL:                      string;
    timeStats:                   TimeStats;
    squash:                      boolean;
    taskCompletionStatus:        TaskCompletionStatus;
    hasConflicts:                boolean;
    blockingDiscussionsResolved: boolean;
}

export interface References {
    short:    string;
    relative: string;
    full:     string;
}

export interface TaskCompletionStatus {
    count:          number;
    completedCount: number;
}

export interface TimeStats {
    timeEstimate:        number;
    totalTimeSpent:      number;
    humanTimeEstimate:   null;
    humanTotalTimeSpent: null;
}
