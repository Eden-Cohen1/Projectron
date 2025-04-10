from mongoengine import Document, StringField, DateTimeField, ReferenceField, ListField, DictField, IntField
from datetime import datetime
from .auth import User

class Project(Document):
    name = StringField(required=True)
    description = StringField(default="")
    tech_stack = ListField(StringField(), default=[])
    experience_level = StringField(choices=("junior", "mid", "senior"), default="junior")
    team_size = IntField(min_value=1, default=1)
    status = StringField(default="draft", choices=("draft", "active", "completed"))
    owner_id = ReferenceField(User, required=True)
    collaborator_ids = ListField(ReferenceField(User))
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    metadata = DictField()
    
    meta = {
        'collection': 'projects',
        'indexes': [
            {'fields': ['owner_id', 'name'], 'unique': True}
        ]
    }

class Milestone(Document):
    project_id = ReferenceField(Project, required=True)
    name = StringField(required=True)
    description = StringField()
    due_date = DateTimeField()
    status = StringField(default="not_started", choices=("not_started", "in_progress", "completed"))
    order = IntField(default=0)
    
    meta = {
        'collection': 'milestones',
        'indexes': [
            'project_id',
            {'fields': ['project_id', 'order']}
        ]
    }

class Task(Document):
    project_id = ReferenceField(Project, required=True)
    milestone_id = ReferenceField(Milestone, required=True)
    name = StringField(required=True)
    description = StringField()
    assignee_id = ReferenceField(User)
    due_date = DateTimeField()
    status = StringField(default="not_started", choices=("not_started", "in_progress", "completed"))
    priority = StringField(default="medium", choices=("low", "medium", "high"))
    estimated_hours = IntField(min_value=0)
    dependency_ids = ListField(ReferenceField('self'))
    order = IntField(default=0)
    
    meta = {
        'collection': 'tasks',
        'indexes': [
            'project_id',
            'milestone_id',
            {'fields': ['project_id', 'status']},
            'due_date'
        ]
    }

class Subtask(Document):
    task_id = ReferenceField(Task, required=True)
    name = StringField(required=True)
    status = StringField(default="not_started", choices=("not_started", "in_progress", "completed"))
    assignee_id = ReferenceField(User)
    order = IntField(default=0)
    
    meta = {
        'collection': 'subtasks',
        'indexes': [
            'task_id'
        ]
    }

