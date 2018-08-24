# Autocompletion script for note command
# NOTE: Add the path to this file as a source in your bash profile
# NOTE: For now my notes directory is hard-coded to ~/Notes/learning-notes (see below)
# via https://debian-administration.org/article/317/An_introduction_to_bash_completion_part_2

_note() 
{
    local cur prev opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    notefiles=$(for x in `ls -1 ~/Notes/learning-notes/*.md`; do echo ${x/\/Users\/liz\/Notes\/learning-notes\//--}; done )

    if [[ ${cur} == -* ]] ; then
        COMPREPLY=( $(compgen -W "${notefiles}" -- ${cur}) )
        return 0
    fi
}
complete -F _note note

