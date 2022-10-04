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
    id?:              string;
    short_id?:        string;
    created_at?:      string;
    parentIds?:      string[];
    title?:           string;
    message?:         string;
    author_name?:     string;
    author_email?:    string;
    authoredDate?:   Date;
    committerName?:  string;
    committerEmail?: string;
    committed_date?: string;
    trailers?:       boolean;
    webUrl?:         string;
}

export interface Branch {
    id:                   string;
    name:                 string;
    commit:               Commit;
    merged:               boolean;
    protected:            boolean;
    developers_can_push:  boolean;
    developers_can_merge: boolean;
    can_push:             boolean;
    default:              boolean;
    web_url:              string;
}
export interface MergeRequest {
    id?:                          number;
    iid?:                         number;
    projectID?:                   number;
    title?:                       string;
    description?:                 string;
    state?:                       string;
    created_at?:                  string;
    updatedAt?:                   Date;
    merged_by?:                   User;
    merge_user?:                  User;
    mergedAt?:                    Date;
    closed_by?:                   User;
    closedAt?:                    null;
    targetBranch?:                string;
    sourceBranch?:                string;
    userNotesCount?:              number;
    upvotes?:                     number;
    downvotes?:                   number;
    author?:                      User;
    assignees?:                   User[];
    assignee?:                    User;
    reviewers?:                   User[];
    sourceProjectID?:             number;
    targetProjectID?:             number;
    labels?:                      string[];
    draft?:                       boolean;
    workInProgress?:              boolean;
    milestone?:                   null;
    mergeWhenPipelineSucceeds?:   boolean;
    mergeStatus?:                 string;
    sha?:                         string;
    mergeCommitSHA?:              string;
    squashCommitSHA?:             null;
    discussionLocked?:            null;
    shouldRemoveSourceBranch?:    boolean;
    forceRemoveSourceBranch?:     boolean;
    reference?:                   string;
    references?:                  References;
    webURL?:                      string;
    timeStats?:                   TimeStats;
    squash?:                      boolean;
    taskCompletionStatus?:        TaskCompletionStatus;
    hasConflicts?:                boolean;
    blockingDiscussionsResolved?: boolean;
}

export interface References {
    short?:    string;
    relative?: string;
    full?:     string;
}

export interface TaskCompletionStatus {
    count?:          number;
    completedCount?: number;
}

export interface TimeStats {
    timeEstimate?:        number;
    totalTimeSpent?:      number;
    humanTimeEstimate?:   null;
    humanTotalTimeSpent?: null;
}

export interface Issue {
    id?:                   number;
    iid?:                  number;
    projectID?:            number;
    title?:                string;
    description?:          string;
    state?:                string;
    created_at?:           string;
    updatedAt?:            Date;
    closed_at?:             string;
    closed_by?:             User;
    labels?:               string[];
    milestone?:            null;
    assignees?:            User[];
    author?:               User;
    type?:                 string;
    assignee?:             User;
    userNotesCount?:       number;
    mergeRequestsCount?:   number;
    upvotes?:              number;
    downvotes?:            number;
    dueDate?:              null;
    confidential?:         boolean;
    discussionLocked?:     null;
    issueType?:            string;
    webURL?:               string;
    timeStats?:            TimeStats;
    taskCompletionStatus?: TaskCompletionStatus;
    hasTasks?:             boolean;
    links?:                Links;
    references?:           References;
    severity?:             string;
    movedToID?:            null;
    serviceDeskReplyTo?:   null;
}

export interface Links {
    self?:                string;
    notes?:               string;
    awardEmoji?:          string;
    project?:             string;
    closedAsDuplicateOf?: null;
}

export interface LabelColor {
    name: string;
    color: string;
}


