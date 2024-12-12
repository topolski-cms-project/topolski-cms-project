package com.topolski.backend.mapper;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class GenericToDTOMapper {

    /**
     * Maps a single entity to a DTO using the provided mapping function.
     *
     * @param <T>            the type of the source entity
     * @param <R>            the type of the target DTO
     * @param entity         the entity to map
     * @param mapperFunction the function to map the entity to a DTO
     * @return the mapped DTO
     */
    public <T, R> R map(T entity, Function<T, R> mapperFunction) {
        if (entity == null) {
            return null;
        }
        return mapperFunction.apply(entity);
    }

    /**
     * Maps a list of entities to a list of DTOs using the provided mapping function.
     *
     * @param <T>            the type of the source entity
     * @param <R>            the type of the target DTO
     * @param entities       the list of entities to map
     * @param mapperFunction the function to map each entity to a DTO
     * @return the list of mapped DTOs
     */
    public <T, R> List<R> mapList(List<T> entities, Function<T, R> mapperFunction) {
        if (entities == null || entities.isEmpty()) {
            return List.of();
        }
        return entities.stream()
                .map(mapperFunction)
                .collect(Collectors.toList());
    }
}
